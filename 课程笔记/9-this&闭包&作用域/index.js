function fn () {
  return {
    b: () => {
      console.log(this)
    }
  }
}

fn().b()
