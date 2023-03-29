AFRAME.registerComponent("bowling-balls", {
    init: function(){
        this.createShoot()
    },
    createShoot: function(){
        window.addEventListener("keydown", (e) => {
            if(e.key === "z"){
                var bullet = document.createElement("a-entity")
                bullet.setAttribute("geometry", {
                    primitive:"sphere",
                    radius:1,
                })
                //bullet.setAttribute("material", "color", "black")
                bullet.setAttribute("scale", { x: 2, y: 2, z: 2 });
                bullet.setAttribute("gltf-model", "./bolos161-main/models/bowling_ball/scene.gltf");
                var cam=document.querySelector("#camera")
                pos = cam.getAttribute("position")
                bullet.setAttribute("position", {
                    x:pos.x,
                    y:pos.y -0.65,
                    z:pos.z
                })
                var camPhi = document.querySelector("#camera").object3D
                var vector = new THREE.Vector3()
                camPhi.getWorldDirection(vector)
                bullet.setAttribute("velocity", vector.multiplyScalar(-4))
                var escena = document.querySelector("#scene")

                bullet.setAttribute("dynamic-body", {
                    shape:"sphere",
                    mass:"0"
                  })
                  bullet.addEventListener("collide", this.removeBullet)

                escena.appendChild(bullet)
            }
        })
    },
    removeBullet: function (e) {
        console.log(e.detail.target.el);
    
        console.log(e.detail.body.el);
    
        var elementBullet=e.detail.target.el
    
        var elementHit=e.detail.body.el
    
        if (elementHit.id.includes("pino")) 
          {
            elementHit.setAttribute("material", {
              color:"black"
            })

            var impulse = new CANNON.Vec3(-2, 2.5, 1)
            var worldPoint= new CANNON.Vec3().copy(elementHit.getAttribute("position"))
            elementHit.body.applyImpulse(impulse, worldPoint)
            elementBullet.removeEventListener("collide", this.shoot)
            var scene = document.querySelector("#scene");
            scene.removeChild(elementBullet)
        }
      },
})