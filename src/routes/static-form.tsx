import StaticForm from '@/components/Form/StaticForm';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/static-form')({
  component: RouteComponent,
})

function RouteComponent() {

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Static Form Example</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StaticForm />
      </div>
    </div>
  );
}
