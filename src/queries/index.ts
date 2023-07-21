export const getTweefs = async () => {
  const res = await fetch('/api/tweefs', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await res.json();
};
