import { Typography, Grid } from '@material-ui/core';
import {
  InfoCard,
  Header,
  Page,
  Content,
  ContentHeader,
  HeaderLabel,
  SupportButton,
} from '@backstage/core-components';
import { EmployeesFetchComponent } from '../EmployeesFetchComponent';

export const EmployeesComponent = () => (
  <Page themeId="tool">
    <Header title="Welcome to employees!" subtitle="Optional subtitle">
      <HeaderLabel label="Owner" value="Team X" />
      <HeaderLabel label="Lifecycle" value="Alpha" />
    </Header>
    <Content>
      <ContentHeader title="Employees">
        <SupportButton>A description of your plugin goes here.</SupportButton>
      </ContentHeader>
      <Grid container spacing={3} direction="column">
        <Grid item>
          <EmployeesFetchComponent />
        </Grid>
      </Grid>
    </Content>
  </Page>
);
