import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as BABYLON from '@babylonjs/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild('renderCanvas', { static: true})
  renderCanvas: ElementRef<HTMLCanvasElement>;

  constructor() { }

  ngOnInit(): void {
    this.render();
  }

  render() {

    const engine = new BABYLON.Engine(this.renderCanvas.nativeElement, true, {}, true); // Generate the BABYLON 3D engine

    const { scene, box } = this.createScene(engine); //Call the createScene function

    // Register a render loop to repeatedly render the scene
    engine.runRenderLoop(() => {
      scene.render();
      box.rotate(new BABYLON.Vector3(0, 1, 0), 0.0174533);
    });
  }

  createScene(engine: BABYLON.Engine) {


    const scene = new BABYLON.Scene(engine);

    const box = BABYLON.MeshBuilder.CreateBox("box", {});

    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 0, 0));
    camera.attachControl(this.renderCanvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);

    return { scene, box };
  };

}
