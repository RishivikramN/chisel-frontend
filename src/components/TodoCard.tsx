import { Card, Icon } from "semantic-ui-react";

interface TodoCardProps {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  onCheckboxChange: (todoId: number) => void;
  onDelete: (todoId: number) => void;
}

function TodoCard({
  id,
  title,
  description,
  completed,
  onCheckboxChange,
  onDelete,
}: TodoCardProps) {
  return (
    <Card>
      <Card.Content>
        <div className="flex-center">
          <div>
            <Card.Header className="text-bold">{title}</Card.Header>
            <Card.Description>{description}</Card.Description>
          </div>
          <div className="flex-center">
            {!completed && (
              <input type="checkbox" onChange={() => onCheckboxChange(id)} />
            )}
            <div className="pl-2">
              <Icon
                className="trash alternate outline cursor-pointer"
                onClick={() => onDelete(id)}
              />
            </div>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
}

export default TodoCard;
