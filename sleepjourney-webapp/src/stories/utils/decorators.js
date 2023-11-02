export const addContainer =
  (max = 'md') =>
  (Story) => {
    const maxWidth = {
      sm: 480,
      md: 720,
      lg: 1080,
      xl: 1200,
      xxl: 1440,
    }[max];

    return (
      <div style={{ width: '100%', maxWidth, margin: 'auto' }}>
        <Story />
      </div>
    );
  };
