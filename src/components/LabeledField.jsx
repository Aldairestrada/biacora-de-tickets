import { Input, Textarea, Select } from '@heroui/react';

function LabeledField({ id, label, children, type = 'input', ...props }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-1 text-gray-700">
        {label}
      </label>

      {type === 'input' && (
        <Input id={id} {...props} />
      )}

      {type === 'textarea' && (
        <Textarea id={id} {...props} />
      )}

      {type === 'select' && (
        <Select id={id} {...props}>
          {children}
        </Select>
      )}
    </div>
  );
}

export default LabeledField;
