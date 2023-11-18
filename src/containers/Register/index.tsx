import {
  Button,
  Form, Input, Space,
} from 'antd-mobile';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { showFail, showSuccess } from '@/utils';
import md5 from 'md5';
import { STUDENT_REGISTER } from '@/graphql/user';
import style from './index.module.less';

interface IValue {
  password: string;
  account: string;
}
/**
  * H5注册页面
  */
const Register = () => {
  const [form] = Form.useForm();
  const [register, { loading }] = useMutation(STUDENT_REGISTER);
  const nav = useNavigate();

  const onRegisterHandler = async (values: IValue) => {
    console.log('values', values);
    const res = await register({
      variables: {
        password: md5(values.password),
        account: values.account,
      },
    });
    console.log('res.data.studentRegister', res.data.studentRegister);
    if (res.data.studentRegister.code === 200) {
      showSuccess(res.data.studentRegister.message);
      nav('/login');
      return;
    }
    const data = res.data.studentRegister;
    showFail(data);
  };
  return (
    <div className={style.container}>
      <div className={style.logo}>
        <img src="http://homework-drop-assets.oss-cn-beijing.aliyuncs.com/images/logo.png" alt="" />
      </div>
      <Form
        form={form}
        layout="horizontal"
        onFinish={onRegisterHandler}
        footer={(
          <Button block loading={loading} type="submit" color="primary" size="large">
            注册
          </Button>
      )}
      >
        <Form.Item
          name="account"
          label="用户名"
          rules={[{
            required: true,
            message: '用户名不能为空',
          }, {
            pattern: /^[A-Za-z]{4,15}$/,
            message: '用户名有且只能英文，长度大于3，小于16',
          }]}
        >
          <Input placeholder="请输入用户名" clearable />
        </Form.Item>
        <Form.Item
          name="password"
          label="输入密码"
          rules={[{
            required: true,
            message: '密码不能为空',
          }, {
            pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,15}$/,
            message: '密码必须同时包含英文和数字，长度大于5，小于16',
          }]}
        >
          <Input clearable type="password" placeholder="请输入密码" />
        </Form.Item>
        <Form.Item
          name="passwordConfirm"
          label="确认密码"
          rules={[{
            required: true,
            message: '密码不能为空',
          }, {
            pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,15}$/,
            message: '密码必须同时包含英文和数字，长度大于5，小于16',
          },
          {
            validator: (_, value) => {
              const password = form.getFieldValue('password');
              if (password === value) {
                return Promise.resolve();
              }
              return Promise.reject();
            },
            message: '两次输入的密码需要一致',
          },
          ]}
        >
          <Input clearable type="password" placeholder="请再次输入密码" />
        </Form.Item>
      </Form>
      <div>
        <Space>
          有账号？去
          <Link to="/login">登录</Link>
        </Space>
      </div>
    </div>
  );
};

export default Register;
