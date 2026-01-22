import { useMutation, useQuery } from '@tanstack/react-query'
import { Button } from '@yukine/ui/button'
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@yukine/ui/card'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@yukine/ui/field'
import { useForm } from '@yukine/ui/hooks/use-form'
import { XIcon } from '@yukine/ui/icons'
import { Input } from '@yukine/ui/input'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@yukine/ui/pagination'
import { Textarea } from '@yukine/ui/textarea'
import { toast } from '@yukine/ui/toast'
import { createPostDto } from '@yukine/validators/post'
import { parseAsInteger, useQueryStates } from 'nuqs'
import { useMemo } from 'react'

import { api } from '@/lib/api'

export default function PostPage() {
  const [query, setQuery] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    limit: parseAsInteger.withDefault(12),
  })

  const handlePageChange = (newPage: number) => {
    setQuery({ page: newPage })
  }

  return (
    <main className='container py-4'>
      <h1 className='sr-only'>Posts Page</h1>

      <CreatePostForm />

      <section className='mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <h2 className='sr-only'>Posts List</h2>
        <PostList query={query} />
      </section>

      <PostPagination query={query} onPageChange={handlePageChange} />
    </main>
  )
}

const CreatePostForm: React.FC = () => {
  const { mutateAsync } = useMutation({
    mutationKey: ['createPost'],
    mutationFn: async (values: { title: string; content: string }) => {
      const { data, error } = await api.v1.posts.post(values)
      if (error) throw new Error(error.value.message)
      return data
    },
    meta: { filter: { queryKey: ['posts'] } },
    onSuccess: () => toast.add({ title: 'Post created', type: 'success' }),
    onError: ({ message }) =>
      toast.add({
        title: 'Failed to create post',
        description: message,
        type: 'error',
      }),
  })

  const { formId, FormField, handleSubmit, state } = useForm({
    defaultValues: { title: '', content: '' },
    schema: createPostDto.body,
    onSubmit: mutateAsync,
  })

  return (
    <Card id={formId} render={<form onSubmit={handleSubmit} />}>
      <FieldSet className='px-6'>
        <FieldLegend>Create New Post</FieldLegend>
        <FieldDescription>
          Fill in the details below to create a new post.
        </FieldDescription>

        <FieldGroup>
          <FormField
            name='title'
            render={({ field, meta }) => (
              <Field data-invalid={meta.errors.length > 0}>
                <FieldLabel htmlFor={field.id}>Title</FieldLabel>
                <Input {...field} placeholder='What is your post title?' />
                <FieldError errors={meta.errors} />
              </Field>
            )}
          />

          <FormField
            name='content'
            render={({ field, meta }) => (
              <Field data-invalid={meta.errors.length > 0}>
                <FieldLabel htmlFor={field.id}>Content</FieldLabel>
                <Textarea
                  {...field}
                  placeholder='Write your post content here...'
                />
                <FieldError errors={meta.errors} />
              </Field>
            )}
          />

          <Field>
            <Button type='submit' disabled={state.isPending}>
              {state.isPending ? 'Creating...' : 'Create Post'}
            </Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </Card>
  )
}

const PostList: React.FC<{ query: { page: number; limit: number } }> = ({
  query,
}) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['posts', query],
    queryFn: async () => {
      const { data, error } = await api.v1.posts.get({ query })
      if (error) throw new Error(error.value.message)
      return data
    },
  })

  if (isLoading)
    return Array.from({ length: query.limit }, (_, i) => (
      <PostCardSkeleton key={i} />
    ))

  if (error) return <p>Error: {error.message}</p>

  return data?.posts.map((post) => (
    <PostCard
      key={post.id}
      id={post.id}
      title={post.title}
      createdAt={new Date(post.createdAt)}
    />
  ))
}

const PostCard: React.FC<{ id: number; title: string; createdAt: Date }> = ({
  id,
  title,
  createdAt,
}) => {
  const { mutate, isPending } = useMutation({
    mutationKey: ['deletePost'],
    mutationFn: async (_: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const { data, error } = await api.v1.posts({ id }).delete()
      if (error) throw new Error(error.value.message)
      return data
    },
    meta: { filter: { queryKey: ['posts'] } },
    onSuccess: () => toast.add({ title: 'Post deleted', type: 'success' }),
    onError: ({ message }) =>
      toast.add({
        title: 'Failed to delete post',
        description: message,
        type: 'error',
      }),
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{createdAt.toLocaleString()}</CardDescription>
        <CardAction>
          <Button
            variant='ghost'
            size='icon'
            onClick={mutate}
            disabled={isPending}
          >
            <XIcon />
          </Button>
        </CardAction>
      </CardHeader>
    </Card>
  )
}

const PostCardSkeleton: React.FC = () => (
  <Card>
    <CardHeader>
      <CardTitle className='w-3/4 animate-pulse rounded-sm bg-muted'>
        &nbsp;
      </CardTitle>
      <CardDescription className='w-1/2 animate-pulse rounded-sm bg-muted'>
        &nbsp;
      </CardDescription>
    </CardHeader>
  </Card>
)

const PostPagination: React.FC<{
  query: { page: number; limit: number }
  onPageChange: (newPage: number) => void
}> = ({ query, onPageChange }) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['posts', query],
    queryFn: async () => {
      const { data, error } = await api.v1.posts.get({ query })
      if (error) throw new Error(error.value.message)
      return data
    },
  })

  const paginationRange = useMemo(
    () => getPaginationRange(data?.totalPages ?? 0, query.page),
    [data?.totalPages, query.page],
  )

  if (isLoading || error || !data) return null

  return (
    <Pagination className='mt-4'>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => {
              if (query.page <= 1) return
              onPageChange(query.page - 1)
            }}
          />
        </PaginationItem>

        {paginationRange.map((page, index) =>
          page === '...' ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem
              key={page}
              onClick={() => onPageChange(Number(page))}
            >
              <PaginationLink isActive={query.page === page}>
                {page}
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        <PaginationItem>
          <PaginationNext
            onClick={() => {
              if (query.page >= data.totalPages) return
              onPageChange(query.page + 1)
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

const getPaginationRange = (totalPages: number, currentPage: number) => {
  if (totalPages <= 7)
    return Array.from({ length: totalPages }, (_, i) => i + 1)

  if (currentPage <= 4) return [1, 2, 3, 4, 5, '...', totalPages]

  if (currentPage >= totalPages - 3)
    return [
      1,
      '...',
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ]

  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ]
}
