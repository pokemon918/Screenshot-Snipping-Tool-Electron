import React from 'react';
import { Navbar, Button, Alignment, Icon } from '@blueprintjs/core';

import './App.css';

function App() {
  const onSnipClick = async () => {
      console.log('todo: making screenshot');

      const { desktopCapturer, remote, shell } = window.require('electron');
      const screen = remote.screen;
      const path = window.require('path');
      const os = window.require('os');
      const fs = window.require('fs');

      try {
          const screenSize = screen.getPrimaryDisplay().workAreaSize;
          const maxDimension = Math.max(
              screenSize.width,
              screenSize.height
          );
          const sources = await desktopCapturer.getSources({
              types: ['screen'],
              thumbnailSize: {
                  width: maxDimension * window.devicePixelRatio,
                  height: maxDimension * window.devicePixelRatio
              }
          });

          const entireScreenSource = sources.find(
              source => source.name === 'Entire Screen' || source.name === 'Screen 1'
          );

          if (entireScreenSource) {
              const outputPath = path.join(os.tmpdir(), 'screenshot.png');
              const image = entireScreenSource.thumbnail.toPNG();

              fs.writeFile(outputPath, image, err => {
                  if (err) return console.error(err);
                  shell.openExternal(`file://${outputPath}`);
              });
          else {
                  window.alert('Screen source not found.');
          }
      } catch (err) {
          console.error(err);
      }


  };

  return (
    <div className="App">
      <Navbar className="bp3-dark">
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>Electron Snip</Navbar.Heading>
          <Navbar.Divider />
          <Button className="bp3-minimal" icon="settings" text="Settings" />
          <Button className="bp3-minimal" icon="help" text="About" />
          <Button
              className="bp3-minimal"
              icon="camera"
              text="Snip"
              onClick={onSnipClick}
          />
        </Navbar.Group>
      </Navbar>
      <main className="App-main">
        <Icon icon="camera" iconSize={100} />
        <p>Electron Snip</p>
      </main>
    </div>
  );
}

export default App;
