interface ButtonProps {
  children: React.ReactNode
  className?: string
}

function Button({ children, className }: ButtonProps) {
  return <button className={className}>{children}</button>
}

export default Button
