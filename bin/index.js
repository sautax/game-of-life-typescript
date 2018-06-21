var canvas=document.getElementById("canvas"),ctx=canvas.getContext("2d"),WIDTH=92,HEIGHT=49,p=.8,scale=20,play=!1;canvas.width=WIDTH*scale;canvas.height=HEIGHT*scale;var grid=function(a,b){this.grid=[[]];var c=[];this.w=a;this.h=b;for(var d=0;d<=a;d++){for(var e=0;e<b;e++)c.push(!1);this.grid.push(c);c=[]}};
grid.prototype.show=function(a){for(var b=0;b<=this.w;b++)for(var c=0;c<this.h;c++)a.beginPath(),a.rect(b*scale,c*scale,scale,scale),a.fillStyle="white",this.grid[b][c]&&(a.fillStyle="black"),a.fill(),a.strokeStyle="grey",a.stroke(),a.closePath()};
grid.prototype.update=function(){for(var a=[],b,c=[],d=0;d<=this.w;d++){for(var e=0;e<=this.h;e++){var g=this.neighbours(d,e);this.grid[d][e]?(b=!0,2===g&&(b=!0),3===g&&(b=!0),3<g&&(b=!1),2>g&&(b=!1)):(b=!1,3===g&&(b=!0));c.push(b)}a.push(c);c=[]}this.grid=a};
grid.prototype.neighbours=function(a,b){var c=0;0!==a&&(this.grid[a-1][b]&&(c+=1),b!==this.h&&this.grid[a-1][b+1]&&(c+=1));0!==b&&(this.grid[a][b-1]&&(c+=1),0!==a&&this.grid[a-1][b-1]&&(c+=1),a!==this.w&&this.grid[a+1][b-1]&&(c+=1));a!==this.w&&this.grid[a+1][b]&&(c+=1);b!==this.h&&(this.grid[a][b+1]&&(c+=1),a!==this.w&&this.grid[a+1][b+1]&&(c+=1));return c};var cells=new grid(WIDTH,HEIGHT);
canvas.addEventListener("click",function(a){var b=Math.floor(a.layerX/scale);a=Math.floor(a.layerY/scale);cells.grid[b][a]=cells.grid[b][a]?!1:!0;cells.show(ctx)});
addEventListener("keypress",function(a){if(" "===a.key||"p"===a.key)play=play?!1:!0;if("r"===a.key){cells.grid=[];for(var b,c=[],d=cells.h,e=cells.w,g=0;g<=e;g++){for(var h=0;h<d;h++)b=!1,Math.random()>=p&&(b=!0),c.push(b);cells.grid.push(c);c=[]}}if("c"===a.key)for(cells.grid=[[]],a=[],b=cells.w,c=cells.h,d=0;d<=b;d++){for(e=0;e<c;e++)a.push(!1);cells.grid.push(a);a=[]}});var f=0;function draw(){f+=1;cells.show(ctx);requestAnimationFrame(draw);play&&cells.update()}draw();