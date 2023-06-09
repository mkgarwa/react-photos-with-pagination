import {Table} from 'react-bootstrap';

const Photos = (props) => {
  const photos = props.photos;

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th className="text-center">Thumbnail</th>
        </tr>
      </thead>
      <tbody>
        {photos &&
          photos.map((data) => (
            <tr key={data.id}>
              <td>{data.id}</td>
              <td>{data.title}</td>
              <td className="text-center">
                <img
                  src={data.thumbnailUrl}
                  width="32"
                  height="32"
                  alt="thumbnail"
                />
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

export default Photos;
