function CategoryBadge({ category }) {
    const colorMap = {
      Inspección: '#3498db',
      'Actualizar manual': '#2ecc71',
      Pendiente: '#7f8c8d'
    };
  
    const bg = colorMap[category] || '#bdc3c7';
  
    return (
      <span style={{
        backgroundColor: bg,
        color: 'white',
        padding: '0.25rem 0.75rem',
        borderRadius: '999px',
        fontSize: '0.8rem',
        marginRight: '0.5rem'
      }}>
        {category}
      </span>
    );
  }
  
  export default CategoryBadge;
  