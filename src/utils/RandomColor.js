export default function RandomColor() {
  const colors = ['yellow', 'red', 'blue', 'green'];
  const colorIndex = Math.floor(Math.random() * colors.length) || 0;
  return colors[colorIndex];
}
