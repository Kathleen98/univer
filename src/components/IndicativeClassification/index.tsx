import { Badge } from "../ui/badge"

interface IndicativeClassificationProps {
  text: string
}

export const IndicativeClassification = ({ text }: IndicativeClassificationProps) => {
  return (
    <Badge className="rounde-md w-6 h-6 bg-green-700 text-white">{text}</Badge>
  )
}