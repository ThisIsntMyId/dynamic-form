import StaticForm from '@/components/Form/StaticForm';
import { createFileRoute } from '@tanstack/react-router'

const userResponse = {
    "basicInfo": {
        "firstName": "Dean",
        "lastName": "Wolfe",
        "email": "wajejosivo@mailinator.com",
        "age": "1",
        "phone": "+115518957053",
        "dateOfBirth": "1974-02-13",
        "gender": "Female"
    },
    "physicalInfo": {
        "heightFeet": "5",
        "heightInches": "10",
        "weight": "77"
    },
    "professionalInfo": {
        "domain": "Similique non assume",
        "profileRate": "82",
        "bio": "Ad ut labore in ea"
    },
    "documents": {
        "tickets": {}
    },
    "preferences": {
        "country": "United States",
        "interests": [
            "Machine Learning",
            "Yoga",
            "Photography"
        ]
    }
};

export const Route = createFileRoute('/static-form')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Static Form Example</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StaticForm initialUserState={userResponse} />
      </div>
    </div>
  );
}
