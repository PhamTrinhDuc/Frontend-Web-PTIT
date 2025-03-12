
import { Button } from 'antd';
import './Error.scss'

function Error() {
  return (
    <div className='error-page'>
      <h1 className='code'>404 Not Found</h1>
      <p className='massage'>Your visited page not found. You may go home page.</p>
      <Button className='back-home' type="ghost" href="/">Back to home page</Button>
    </div>
  );
}

export default Error;