import DummyFormComponent from '@/components/DummyFormComponent'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-3xl font-bold text-teal-800 mb-8 text-center tracking-wide">Join Minimal</div>
      <DummyFormComponent />
    </div>
  )
}
