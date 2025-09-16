import Image from "next/image"
import { Card } from "../ui/card"

export const NewContent = () => {
  return (
    <Card>
      <Image src="https://univer-prod.cloud.seachange.com/dynamic-image-service/unsafe/fit-in/232x348/filters:upscale():fill(blur):format(webp)/univideo01.akamaized.net/cdn/asset/images/thumb-v-WVzeX-A5P2Y.jpg" alt='cartaz' width={312} height={455} />
    </Card>
  )
}