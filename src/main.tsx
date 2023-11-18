import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { ConfigProvider } from 'antd-mobile';
import zhCN from 'antd-mobile/es/locales/zh-CN';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import StudentInfo from '@/components/StuentInfo';
import { client } from './utils/apollo';
import { ROUTE_COMPONENT } from './routes';

import '@/theme.css';
import Login from './containers/Login';
import Register from './containers/Register';
import { routes } from './routes/menus';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ConfigProvider locale={zhCN}>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <StudentInfo>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<App />}>
              {routes.map((item) => {
                const Component = ROUTE_COMPONENT[item.key];
                return (
                  <Route
                    path={item.path}
                    key={item.key}
                    element={<Component />}
                  />
                );
              })}
            </Route>
          </Routes>
        </StudentInfo>
      </BrowserRouter>
    </ApolloProvider>
  </ConfigProvider>,
);
