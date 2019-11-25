class Thrust
{
  constructor(name)
  {
    this.thrustData = thrustCurves[name];
  }
  linearlyInterpolate(x1, x2, x3, y1, y3)
  {
    return (((x2 - x1) * (y3 - y1)) / (x3 - x1)) + y1;
  }
  getThrust(t)
  {
    let t0 = 0, t1 = 1, a0 = 0, a1 = 0;
    for(let i = 0; i < this.thrustData.length; i++)
    {
      let point = this.thrustData[i];
      if(point.x == t)
      {
        return point.y;
      }

      if(point.x < t)
      {
        t0 = point.x;
        a0 = point.y;
      }
      else if(point.x > t)
      {
        t1 = point.x;
        a1 = point.y;
        break;
      }

      if(t1 == 0 && a1 == 0)
      {
        return 0;
      }
    }
    return this.linearlyInterpolate(t0, t, t1, a0, a1)
  }
}