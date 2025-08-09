import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableColumn,
  Progress,
  ResponseErrorPanel,
} from '@backstage/core-components';
import { configApiRef, useApi, fetchApiRef } from '@backstage/core-plugin-api';
import { discoveryApiRef } from '@backstage/core-plugin-api';
import useAsync from 'react-use/lib/useAsync';
import React from 'react';

const useStyles = makeStyles({
  avatar: {
    height: 32,
    width: 32,
    borderRadius: '50%',
  },
});

type User = {
  id: number;
  name: string;
  email: string;
  username: string;
  phone: string;
};

type DenseTableProps = {
  users: User[];
};

export const DenseTable = ({ users }: DenseTableProps) => {
  const classes = useStyles();

  const columns: TableColumn[] = [
    { title: 'Avatar', field: 'avatar' },
    { title: 'Name', field: 'name' },
    { title: 'Email', field: 'email' },
    { title: 'Username', field: 'username' },
    { title: 'Phone', field: 'phone' },
  ];

  const data = users.map(user => {
    return {
      avatar: (
        <img
          src={`https://api.dicebear.com/6.x/open-peeps/svg?seed=${user.name}`}
          className={classes.avatar}
          alt={user.name}
        />
      ),
      name: user.name,
      email: user.email,
      username: user.username,
      phone: user.phone,
    };
  });

  return (
    <Table
      title="Lista de Usuários"
      options={{ search: false, paging: false }}
      columns={columns}
      data={data}
    />
  );
};

export const EmployeesFetchComponent = () => {
  const configApi = useApi(configApiRef);
  const fetchApi = useApi(fetchApiRef);
  const backendBaseUrl = configApi.getString('backend.baseUrl');

  const { value, loading, error } = useAsync(async (): Promise<User[]> => {
    const proxyUrl = `${backendBaseUrl}/api/proxy/fetch-employees/users`;
    const auditUrl = `${backendBaseUrl}/api/audit/log`;

    let responseStatus: number;
    let responseData: User[];

    try {
      const response = await fetchApi.fetch(proxyUrl);
      responseStatus = response.status;

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${responseStatus}`);
      }
      
      responseData = await response.json();
      return responseData; 

    } finally {   
      console.log(`Auditing call to ${proxyUrl} with status ${responseStatus}`);
      try {
        await fetchApi.fetch(auditUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            method: 'GET',
            path: proxyUrl,
            status: responseStatus,
            user: 'user.frontend',
          }),
        });
      } catch (logError) {
        console.error('Failed to write audit log:', logError);
      }
    }
  }, []);

  if (loading) {
    return <Progress />;
  } else if (error) {
    return <ResponseErrorPanel error={error} />;
  }

  return <DenseTable users={value || []} />;
};