
import useGetRecord from '../hooks/useGetRecord';
import Loading from '../components/Loading';
const Detiles = () => {

  const { record, error, loading } = useGetRecord()
  console.log(record, error, loading)
  return (
    <Loading loading={loading} error={error}>
      <h1>{record?.title}</h1>
      <p>{record?.description}</p>
    </Loading>
  )
}

export default Detiles
