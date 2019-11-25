let rocket = new Rocket(150.3, 0.0359, "default", 1.225, 1, 76, 4, 30, 50, 4, 250, 29);
let simulation = new Simulation(rocket, 0.01, 1.225);
simulation.run();
simulation.printData();
graphData("altitudeGraph", rocket.altitudeOverTime, 10, "Altitude (m)");
graphData("velocityGraph", rocket.velocityOverTime, 10, "Velocity (m/s)");
graphData("accelerationGraph", rocket.accelerationOverTime, 10, "Acceleration (m/s^2)");
graphData("dragGraph", rocket.dragOverTime, 10, "Drag (N)");