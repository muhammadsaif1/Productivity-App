import React from 'react';
import { Container, Paper, Grid, Box, Avatar } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import classes from './style.module.css';
import pic from '../../assets/saif.jpg';
import Text from '../../components/Custom/Typography';

const AboutMe: React.FC = () => {
  return (
    <div
      style={{
        background: '',
        height: '100%',
        width: '100%',
        minHeight: '90.1vh',
      }}
    >
      <Container maxWidth="md" className={classes.container}>
        <Paper elevation={3} className={classes.paper}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Avatar
                alt="Muhammad Saif"
                src={pic}
                className={classes.avatar}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Text variant="h4" component="h1" gutterBottom>
                Muhammad Saif
              </Text>
              <Text variant="h6" component="h2" gutterBottom>
                Software Engineer | MERN Developer
              </Text>
              <Text variant="body1" paragraph>
                Hello! I'm Muhammad Saif, a passionate software engineer and
                MERN developer with a strong background in developing web
                applications. With expertise in MongoDB, Express.js, React, and
                Node.js, I enjoy building robust and scalable applications.
              </Text>
              <Text variant="body1" paragraph>
                I have worked on various projects that involve both frontend and
                backend development, including designing responsive user
                interfaces, creating RESTful APIs, and implementing database
                solutions. My goal is to create seamless user experiences and
                efficient backend systems.
              </Text>
              <Text variant="body1" paragraph>
                Feel free to reach out to me for any collaboration or project
                opportunities. You can find my contact information below.
              </Text>
              <Box className={classes.contactInfo}>
                <Text variant="h6" component="h3" gutterBottom>
                  Contact Information
                </Text>
                <Box className={classes.contactItem}>
                  <EmailIcon className={classes.contactIcon} />
                  <Text variant="body1">saif.shabir12@gmail.com</Text>
                </Box>
                <Box className={classes.contactItem}>
                  <LinkedInIcon className={classes.contactIcon} />
                  <Text variant="body1">
                    <a
                      href="https://www.linkedin.com/in/muhammad-saif-b86173260/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={classes.name}
                    >
                      <Text fontWeight={600}> MUHAMMAD SAIF</Text>
                    </a>
                  </Text>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
};

export default AboutMe;
