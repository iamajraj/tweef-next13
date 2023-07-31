export const getTweefs = async () => {
  const res = await fetch('/api/tweefs', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.json();
};
export const getTweef = (id: string) => async () => {
  const res = await fetch(`/api/tweefs/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.json();
};
