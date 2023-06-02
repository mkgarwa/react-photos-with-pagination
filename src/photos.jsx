const Photos = (props) => {
  const photos = props.photos;

  return (
    <table border="1" className="photos-table">
      <tr>
        <th>ID</th>
        <th>Title</th>
        <th>Thumbnail</th>
      </tr>
      {photos.map((data, index) => (
        <tr key={data.id}>
          <td>{data.id}</td>
          <td>{data.title}</td>
          <td>
            <img
              src={data.thumbnailUrl}
              width="32"
              height="32"
              alt="thumbnail"
            />
          </td>
        </tr>
      ))}
    </table>
  );
};

export default Photos;
