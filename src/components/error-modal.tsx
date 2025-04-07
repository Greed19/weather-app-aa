import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertTriangle, MapPin } from "lucide-react"

const ErrorModal = ({
    title,
    errorDescription,
    getLocation }: {
        title: string,
        errorDescription: string,
        getLocation: () => void
    }) => {
    return <Alert variant={'destructive'}>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
            <p>{errorDescription}</p>
            <Button onClick={getLocation} className="w-fit" variant={'outline'}>
                <MapPin className="mr-2 h-4 w-4" />
                Enable Location
            </Button>
        </AlertDescription>
    </Alert>
}

export default ErrorModal