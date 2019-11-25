class Rocket
{
  constructor(dryMass, propMass, thrustCurve, airDensity, noseConeType, fuselageDiameter, numFins, finLength, finWidth, numAirBrakes, airBrakeLength, airBrakeWith)
  {
    this.dryMass = dryMass / 1000;
    this.propMass = propMass;
    this.airDensity = airDensity;
    this.noseConeType = noseConeType;
    this.fuselageDiameter = fuselageDiameter / 1000;
    this.crossSectionalArea = Math.PI * (this.fuselageDiameter / 2)**2;
    this.numFins = numFins;
    this.finLength = finLength / 1000;
    this.finWidth = finWidth / 1000;
    this.airBrakeWidth = airBrakeWith / 1000;
    this.airBrakeLength = airBrakeLength / 1000;
    this.numAirBrakes = numAirBrakes;
    this.airBrakeAngle = 90;
    this.thrust = new Thrust(thrustCurve);

    this.accelerationOverTime = [];
    this.velocityOverTime = [];
    this.altitudeOverTime = [];
    this.dragOverTime = [];
    this.thrustOverTime = [];
    this.thrustForce = 0;
    this.acceleration = 0;
    this.elapsedTime = 0;
    this.altitude = 0.1;
    this.velocity = 0;
  }

  calculateAcceleration(force)
  {
    return ((force / (this.dryMass + this.propMass)) - 9.81);
  }

  calculateAndPushAcceleration(force)
  {
    this.acceleration = ((force / (this.dryMass + propMass)) - 9.81);
    if (this.altitude <= 0 && this.acceleration < 0) this.acceleration = 0.0;
    let point = {
      x: elapsedTime,
      y: acceleration
    }
    this.accelerationOverTime.push(point);
    return this.acceleration;
  }

  calculateDrag()
  {
    let noseDragCoeficent = this.noseConeTypeToDragCoeficent();
    let noseDrag = 0.5 * this.airDensity * this.velocity**2 * noseDragCoeficent * this.crossSectionalArea;
    let finDrag = (0.5 * this.airDensity * this.velocity**2 * 0.21 * this.finLength * this.finWidth) * this.numFins;
    let airbrakeDrag = (0.5 * this.airDensity * this.velocity**2 * 1.05 * Math.cos(this.airBrakeAngle * Math.PI/180) * (this.airBrakeLength * this.airBrakeWidth)) * this.numAirBrakes;
    let Fd = noseDrag + finDrag + airbrakeDrag;

    if(this.velocity > 0) return -1 * Fd;
    else return Fd;
  }

  noseConeTypeToDragCoeficent()
  {
    switch (this.noseConeType)
    {
      case 1:
        return 0.05;
        break;
      case 2:
        return 0.1;
        break;
      case 3:
        return 0.2;
        break;
      default:
        return 0;
        break;
    }
  }

  tick(deltaT)
  {
    let Df = this.calculateDrag();
    let Da = Df / (this.dryMass + this.propMass);
    this.thrustForce = this.thrust.getThrust(this.elapsedTime);
    this.acceleration = this.calculateAcceleration(this.thrustForce) + (Df/(this.propMass + this.dryMass));
    this.elapsedTime += deltaT;
	  this.altitude += deltaT * (this.velocity + deltaT * this.acceleration / 2);
    this.velocity += deltaT * this.acceleration;

    if (this.altitude < 0) //Prevents rocket from going underground
    {
      this.altitude = 0;
      this.velocity = 0;
    }

    let a = {
      x: this.elapsedTime,
      y: this.acceleration
    }
    let v = {
      x: this.elapsedTime,
      y: this.velocity
    }
    let alt = {
      x: this.elapsedTime,
      y: this.altitude
    }
    let d = {
      x: this.elapsedTime,
      y: Df
    }
    let t = {
      x: this.elapsedTime,
      y: this.thrustForce
    }

    this.accelerationOverTime.push(a);
    this.velocityOverTime.push(v);
    this.altitudeOverTime.push(alt);
    this.dragOverTime.push(d);
    this.thrustOverTime.push(t);
  }
}