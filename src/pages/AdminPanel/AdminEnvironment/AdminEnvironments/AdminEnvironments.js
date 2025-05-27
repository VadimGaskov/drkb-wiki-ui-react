import useFetch from "../../../../hooks/useFetch";

const AdminEnvironments = () => {
    const [environments, isEnvironmentsLoading, envrionmentsError] = useFetch(() => getAllEnvironments())
    return(
        <>

        </>
    )
}

export default AdminEnvironments;