import Link from 'next/link';
import Head from 'next/head';
//
export default function Navibar(){
  return (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <Link href="/" className="navbar-brand"> </Link> 
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" >
    <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <Link href="/" className="nav-link">
            <a className="ml-2"> <i className="fas fa-home"></i> Home </a>
          </Link>                    
        </li>
        <li className="nav-item active">
          <Link href="/tasks" className="nav-link">
            <a className="ml-2"><i className="fas fa-check"></i> Tasks </a></Link>                    
        </li>        
        <li className="nav-item active">
          <Link href="/books" className="nav-link">
            <a className="ml-2"><i className="fas fa-check"></i> Books </a></Link>                    
        </li>        
        <li className="nav-item active">
          <Link href="/book_sort" className="nav-link">
            <a className="ml-2"><i className="fas fa-check"></i> BookSort </a></Link>                    
        </li>        
      </ul>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link href="/about" className="nav-link">
            <a><i className="fas fa-info ml-2"></i> About </a> 
          </Link>                    
        </li>
      </ul>            
    </div>
  </nav>
  );
}
