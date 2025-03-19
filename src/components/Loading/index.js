
import { Spin } from 'antd';

function Loading({loading}) {
  return <div className="spin-container">
    <Spin spinning={loading} size="large" />
  </div>
}

export default Loading;