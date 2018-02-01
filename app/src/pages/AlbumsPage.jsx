"use strict"

import React, { Component } from "react";
import Page from '../common-layout/Page';
import AppDescriptionCard from "../albums-page-layout/AppDescriptionCard";
import AlbumsSection from "../albums-page-layout/AlbumsSection";

class AlbumsPage extends Component {
  render() {
    return (
      <Page>
        <header>
          <AppDescriptionCard />
        </header>
        <main>
          <AlbumsSection />
        </main>
      </Page>
    );
  }
}

export default AlbumsPage;
