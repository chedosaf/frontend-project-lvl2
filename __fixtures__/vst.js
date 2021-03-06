const vst = [
  {
    key: 'common',
    type: 'attachment',
    children: [
      {
        key: 'follow',
        type: 'added',
        value: false,
      },
      {
        key: 'setting1',
        type: 'unchanged',
        value: 'Value 1',
      },
      {
        key: 'setting2',
        type: 'deleted',
        value: 200,
      },
      {
        key: 'setting3',
        type: 'updated',
        prevValue: true,
        value: null,
      },
      {
        key: 'setting4',
        type: 'added',
        value: 'blah blah',
      },
      {
        key: 'setting5',
        type: 'added',
        value: { key5: 'value5' },
      },
      {
        key: 'setting6',
        type: 'attachment',
        children: [
          {
            key: 'doge',
            type: 'attachment',
            children: [
              {
                key: 'wow',
                type: 'updated',
                prevValue: '',
                value: 'so much',
              },
            ],
          },
          {
            key: 'key',
            type: 'unchanged',
            value: 'value',
          },
          {
            key: 'ops',
            type: 'added',
            value: 'vops',
          },
        ],
      },
    ],
  },
  {
    key: 'group1',
    type: 'attachment',
    children: [
      {
        key: 'baz',
        type: 'updated',
        prevValue: 'bas',
        value: 'bars',
      },
      {
        key: 'foo',
        type: 'unchanged',
        value: 'bar',
      },
      {
        key: 'nest',
        type: 'updated',
        prevValue: { key: 'value' },
        value: 'str',
      },
    ],
  },
  {
    key: 'group2',
    type: 'deleted',
    value: { abc: 12345, deep: { id: 45 } },
  },
  {
    key: 'group3',
    type: 'added',
    value: { fee: 100500, deep: { id: { number: 45 } } },
  },
];

export default vst;
