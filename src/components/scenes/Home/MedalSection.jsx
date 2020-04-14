import React from 'react';
import { Medal } from './Medal';

export const MedalSection = ({ stats }) => (
  <div className="medal-section">
    <div className="name">{stats.name}</div>
    {stats.issues_closed > 0 && (
      <Medal label="Issues closed" score={stats.issues_closed} />
    )}
    {stats.issues_opened > 0 && (
      <Medal label="Issues opened" score={stats.issues_opened} />
    )}
    {stats.pull_request_closed > 0 && (
      <Medal label="PR closed" score={stats.pull_request_closed} />
    )}
    {stats.pull_request_opened > 0 && (
      <Medal label="PR opened" score={stats.pull_request_opened} />
    )}
    {stats.pull_request_reopened > 0 && (
      <Medal
        label="PR reopened"
        score={stats.pull_request_reopened}
      />
    )}
    {stats.pull_request_review_submitted > 0 && (
      <Medal
        label="PR Reviews"
        score={stats.pull_request_review_submitted}
      />
    )}
  </div>
);
