const vst = [
  {
    name: 'common',
    type: 'attachment',
    value: [],
    children: [
      {
        name: 'follow',
        type: 'added',
        value: false,
        children: [],
      },
      {
        name: 'setting1',
        type: 'unchanged',
        value: 'Value 1',
        children: [],
      },
      {
        name: 'setting2',
        type: 'deleted',
        value: 200,
        children: [],
      },
      {
        name: 'setting3',
        type: 'updated',
        prevValue: true,
        newValue: null,
        children: [],
      },
      {
        name: 'setting4',
        type: 'added',
        value: 'blah blah',
        children: [],
      },
      {
        name: 'setting5',
        type: 'added',
        value: { key5: 'value5' },
        children: [],
      },
      {
        name: 'setting6',
        type: 'attachment',
        value: [],
        children: [
          {
            name: 'doge',
            type: 'attachment',
            value: [],
            children: [
              {
                name: 'wow',
                type: 'updated',
                prevValue: '',
                newValue: 'so much',
                children: [],
              },
            ],
          },
          {
            name: 'key',
            type: 'unchanged',
            value: 'value',
            children: [],
          },
          {
            name: 'ops',
            type: 'added',
            value: 'vops',
            children: [],
          },
        ],
      },
    ],
  },
  {
    name: 'group1',
    type: 'attachment',
    value: [],
    children: [
      {
        name: 'baz',
        type: 'updated',
        prevValue: 'bas',
        newValue: 'bars',
        children: [],
      },
      {
        name: 'foo',
        type: 'unchanged',
        value: 'bar',
        children: [],
      },
      {
        name: 'nest',
        type: 'updated',
        prevValue: { key: 'value' },
        newValue: 'str',
        children: [],
      },
    ],
  },
  {
    name: 'group2',
    type: 'deleted',
    value: { abc: 12345, deep: { id: 45 } },
    children: [],
  },
  {
    name: 'group3',
    type: 'added',
    value: { fee: 100500, deep: { id: { number: 45 } } },
    children: [],
  },
];

export default vst;
