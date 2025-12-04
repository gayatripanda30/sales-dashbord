interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const Input = ({ value, onChange, placeholder }: InputProps) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="input"
    />
  );
};

export default Input;
