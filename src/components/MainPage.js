import React, { Component } from 'react';
import MainTable from '../components/MainTable';
import {
  AppBar,
  Toolbar,
  Typography,
} from '@material-ui/core';

export default class MainPage extends Component {
  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">
              Data Feed Status Demo
            </Typography>
          </Toolbar>
        </AppBar>
        <MainTable darkMode={this.props.darkMode}></MainTable>
      </div>
    )
  }
}