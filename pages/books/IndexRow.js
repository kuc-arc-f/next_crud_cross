import Link from 'next/link';
//import Header from '../Layout/AppHead';

const IndexRow = props => (
  <tr>
    <td>
      <Link href={`/books/${props.id}`}>
        <h3><a>{props.title}</a></h3>
      </Link>
      {props.date} , ID: {props.id}<br />
      Category : {props.category_name}
    </td>
    <td>
      <Link href={`/books/edit/${props.id}`}>
        <a className="btn btn-sm btn-outline-primary"> Edit</a>
      </Link>
    </td>
  </tr>
);
export default IndexRow;
