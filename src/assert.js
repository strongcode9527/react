export default function assert(val) {
  if (!Boolean(val)) {
    throw new Error('assertion failure')
  }
}

