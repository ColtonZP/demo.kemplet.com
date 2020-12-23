export const quickId = () => {
  const date = Date.now().toString().substring(3);
  let chars = '';
  for (let i = 0; i < 5; i++) {
    const ranChar = Math.floor(Math.random() * Math.floor(26));
    let char = String.fromCharCode(ranChar + 65);
    const toLower = Math.random() > 0.5;
    if (toLower) {
      char = char.toLowerCase();
    }
    chars = chars + char;
  }
  return `${chars}-${date}`;
};
