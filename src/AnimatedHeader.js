import React, { useEffect } from 'react';
import { gsap, Circ } from 'gsap'; // Import gsap and Circ
import './App.css'; // Ensure this path is correct

const AnimatedHeader = () => {
    useEffect(() => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const target = { x: width / 2, y: height / 2 };
        let animateHeader = true;
        const points = [];
        let canvas, ctx;

        const initHeader = () => {
            const largeHeader = document.getElementById('large-header');
            largeHeader.style.height = `${height}px`;

            canvas = document.getElementById('demo-canvas');
            canvas.width = width;
            canvas.height = height;
            ctx = canvas.getContext('2d');

            // Create points
            for (let x = 0; x < width; x += width / 20) {
                for (let y = 0; y < height; y += height / 20) {
                    const px = x + Math.random() * (width / 20);
                    const py = y + Math.random() * (height / 20);
                    const p = { x: px, originX: px, y: py, originY: py };
                    points.push(p);
                }
            }

            // Find the 5 closest points
            points.forEach((p1) => {
                const closest = [];
                points.forEach((p2) => {
                    if (p1 !== p2) {
                        let placed = false;
                        for (let k = 0; k < 5; k++) {
                            if (!placed) {
                                if (closest[k] === undefined) {
                                    closest[k] = p2;
                                    placed = true;
                                }
                            }
                        }
                        for (let k = 0; k < 5; k++) {
                            if (!placed) {
                                if (getDistance(p1, p2) < getDistance(p1, closest[k])) {
                                    closest[k] = p2;
                                    placed = true;
                                }
                            }
                        }
                    }
                });
                p1.closest = closest;
            });

            // Assign a circle to each point
            points.forEach((point) => {
                const c = new Circle(point, 2 + Math.random() * 2, 'rgba(255,255,255,0.3)');
                point.circle = c;
            });
        };

        const addListeners = () => {
            if (!('ontouchstart' in window)) {
                window.addEventListener('mousemove', mouseMove);
            }
            window.addEventListener('scroll', scrollCheck);
            window.addEventListener('resize', resize);
        };

        const mouseMove = (e) => {
            const posx = e.pageX || (e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft);
            const posy = e.pageY || (e.clientY + document.body.scrollTop + document.documentElement.scrollTop);
            target.x = posx;
            target.y = posy;
        };

        const scrollCheck = () => {
            animateHeader = document.body.scrollTop <= height;
        };

        const resize = () => {
            const newWidth = window.innerWidth;
            const newHeight = window.innerHeight;
            canvas.width = newWidth;
            canvas.height = newHeight;
            const largeHeader = document.getElementById('large-header');
            largeHeader.style.height = `${newHeight}px`;
        };

        const initAnimation = () => {
            animate();
            points.forEach((point) => {
                shiftPoint(point);
            });
        };

        const animate = () => {
            if (animateHeader) {
                ctx.clearRect(0, 0, width, height);
                points.forEach((point) => {
                    if (Math.abs(getDistance(target, point)) < 4000) {
                        point.active = 0.3;
                        point.circle.active = 0.6;
                    } else if (Math.abs(getDistance(target, point)) < 20000) {
                        point.active = 0.1;
                        point.circle.active = 0.3;
                    } else if (Math.abs(getDistance(target, point)) < 40000) {
                        point.active = 0.02;
                        point.circle.active = 0.1;
                    } else {
                        point.active = 0;
                        point.circle.active = 0;
                    }

                    drawLines(point);
                    point.circle.draw();
                });
            }
            requestAnimationFrame(animate);
        };

        const shiftPoint = (p) => {
            gsap.to(p, 1 + Math.random(), {
                x: p.originX - 50 + Math.random() * 100,
                y: p.originY - 50 + Math.random() * 100,
                ease: Circ.easeInOut,
                onComplete: () => {
                    shiftPoint(p);
                },
            });
        };

        const drawLines = (p) => {
            if (!p.active) return;
            p.closest.forEach((closestPoint) => {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(closestPoint.x, closestPoint.y);
                ctx.strokeStyle = `rgba(156,217,249,${p.active})`;
                ctx.stroke();
            });
        };

        const Circle = function (pos, rad, color) {
            this.pos = pos || null;
            this.radius = rad || null;
            this.color = color || null;
            this.active = 0;

            this.draw = function () {
                if (!this.active) return;
                ctx.beginPath();
                ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false);
                ctx.fillStyle = `rgba(156,217,249,${this.active})`;
                ctx.fill();
            };
        };

        const getDistance = (p1, p2) => {
            return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
        };

        initHeader();
        initAnimation();
        addListeners();

        return () => {
            // Cleanup event listeners on component unmount
            window.removeEventListener('mousemove', mouseMove);
            window.removeEventListener('scroll', scrollCheck);
            window.removeEventListener('resize', resize);
        };
    }, []); // Run the effect only once on mount

    return (
        <div id="large-header" className="large-header">
            <canvas id="demo-canvas"></canvas>
            <h2 className="main-title">Get ready for something Special!</h2>
        </div>
    );
};

export default AnimatedHeader;
