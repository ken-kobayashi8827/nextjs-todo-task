export default function TodoDetail({ params }: { params: { id: string } }) {
  const id = params.id;
  return <h1>Todo{id}詳細</h1>;
}
