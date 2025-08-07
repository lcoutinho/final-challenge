import { makeStyles } from '@mui/styles';
import React from 'react';
import Grid from '@mui/material/Grid';
import { HomePageSearchBar } from '@backstage/plugin-search';
import { styled } from '@mui/material/styles';
//import { GaugeCard } from '../gauge/GaugeCard';
import ReactMarkdown from 'react-markdown';
import {
  Content,
  GaugeCard,
  Progress,
  InfoCard,
  MarkdownContent,
} from '@backstage/core-components';

const Wrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.paper,
  borderRadius: 12,
}));

const useStyles = makeStyles({
  searchBar: {
    width: '100%',
  },
  inputRoot: {
    borderRadius: '50px',
  },

searchBarOutline: {
    borderRadius: '24px',
  },
});
  const releaseNotes = `
### 🚀 Release v1.0.0

- ✅ Tema customizado do Backstage (Com as cores do VS Code)
- ✅ Home customizada
- ✅ Custom field para listar times
- ✅ Plugin de front-end com proxy
- ✅ Plugin de back-end com banco de dados
- ✅ Integração com GitHub
`;

export const HomePage = () => {
    const classes = useStyles();

    return (

     <Content>
    <Grid container spacing={3} justifyContent="space-between" alignItems="flex-start">
        <Grid item>
          <GaugeCard title="Taxa de sucesso de deploy" subheader="Last 24h" value={100} max={100} />
        </Grid>

        <Grid item>
          <InfoCard title="Loop infinito" style={{ width: 320 }}>
            <div style={{ padding: 16 }}>
              <Progress value={0.45} />
              <div style={{ marginTop: 8 }}>45% concluido</div>
            </div>
          </InfoCard>
        </Grid>

        <Grid item>
           <InfoCard title="Release Notes" style={{ width: 320 }}>
            <div style={{ padding: 16 }}>
              <ReactMarkdown>{releaseNotes}</ReactMarkdown>
            </div>
          </InfoCard>
        </Grid>
      </Grid>

          <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: '40vh' }}
      >
        <Grid item>
          <HomePageSearchBar
            placeholder="Search"
              classes={{
                    root: classes.searchBar,
                }}
              InputProps={{
                classes: {
                notchedOutline: classes.searchBarOutline,
                },
                sx: { borderRadius: 24 }
            }}
          />

          
        </Grid>
      </Grid>
    </Content>

    )
}