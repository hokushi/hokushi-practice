import { Button } from "@/components/ui/button";

type UserNameDisplayProps = {
  name: string;
};

export default function UserNameDisplay({ name }: UserNameDisplayProps) {
  return (
    <div className="fixed top-4 right-4">
      <Button type="button" variant="outline" className="h-6 rounded-full px-3">
        {name}
      </Button>
    </div>
  );
}
