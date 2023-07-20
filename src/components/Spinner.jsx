export function Spinner({ isLoading }) {
  if (isLoading) {
    return <div className="spinner"></div>;
  }
}
