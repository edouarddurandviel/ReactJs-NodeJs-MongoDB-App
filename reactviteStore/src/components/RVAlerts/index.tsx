import { Alert } from "./styles"

const Index = (props: AlertProps) => {
    return (props.open &&
        <Alert 
            color={(props.data.status === 200 && 'green') || 'red'}
            onClick={() => {
                props.closeModal()
            }}
        >
        {props.data.status === 200 ? 'Success' : 'Error'}
        </Alert>
    )
}

interface AlertProps {
    data: any;
    open: boolean;
    closeModal: () => void
}

export default Index