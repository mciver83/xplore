import { map } from 'ramda';

import { normalize } from '../../../app/lib/jsonapi';

const { freeze } = Object;

const toId = data => data.id;

const setup = () => {
  const person = { id: '1', type: 'people', attributes: { firstName: 'John', lastName: 'Doe' } };
  const people = [person];

  const company1 = { id: '32', type: 'companies', attributes: { name: 'Black Rock LLC' } };
  const company2 = { id: '35', type: 'companies', attributes: { name: 'Objective Inc' } };
  const companies = [company1, company2];

  const user = freeze({
    id: '1',
    type: 'users',
    attributes: { email: 'user@example.com' },
    relationships: {
      people: { data: [{ type: 'people', id: '1' }] },
      companies: { data: [{ type: 'companies', id: '32' }, { type: 'companies', id: '35' }] },
    },
  });

  const jsonApiDocument = { data: user, included: [person, company1, company2] };

  return { jsonApiDocument, people, companies, user };
};

describe('normalize', function () {
  context('when given a valid Json API Document', function () {
    beforeEach(function () {
      const { jsonApiDocument } = setup();

      this.subject = normalize(jsonApiDocument);
    });

    context('returns an object with .data', function () {
      it('has flattened attributes', function () {
        const { jsonApiDocument } = setup();

        expect(this.subject.data).to.include({
          id: jsonApiDocument.data.id,
          ...jsonApiDocument.attributes,
        });
      });

      it('has flattened relationships', function () {
        const { jsonApiDocument } = setup();
        const { people, companies } = jsonApiDocument.data.relationships;

        expect(this.subject.data.people).to.eql(map(toId, people.data));
        expect(this.subject.data.companies).to.eql(map(toId, companies.data));
      });
    });

    context('returns an object with .included', function () {
      it('has a key for each unique type in `included`', function () {
        expect(this.subject.included).to.contain.keys(['companies', 'people']);
      });

      it('flattens the attributes of each company', function () {
        const { companies } = setup();

        companies.forEach((company, index) => {
          expect(this.subject.included.companies[index]).to.eql({
            id: company.id,
            ...company.attributes,
          });
        });
      });

      it('flattens the attributes of each person', function () {
        const { people } = setup();

        people.forEach((person, index) => {
          expect(this.subject.included.people[index]).to.eql({
            id: person.id,
            ...person.attributes,
          });
        });
      });
    });
  });
});
