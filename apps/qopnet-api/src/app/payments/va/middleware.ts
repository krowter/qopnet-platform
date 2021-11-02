export const getBill = async (req, res) => {
  try {
    res.send({
      message: '',
    })
  } catch (error) {
    res.status(500).send({
      message: '',
      error,
    })
  }
}

export const payBill = async (req, res) => {
  try {
    res.send({
      message: '',
    })
  } catch (error) {
    res.status(500).send({
      message: '',
      error,
    })
  }
}

export const revBill = async (req, res) => {
  try {
    res.send({
      message: '',
    })
  } catch (error) {
    res.status(500).send({
      message: '',
      error,
    })
  }
}
